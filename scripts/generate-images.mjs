/**
 * Generates site photography via the OpenAI images API.
 *
 * Reads the key from ../.env (OpenAI_API_KEY), writes PNGs straight into
 * public/images/ under the filename each page already expects, so generated
 * images need no renaming or wiring afterwards.
 *
 * Usage:
 *   node scripts/generate-images.mjs                 # every job
 *   node scripts/generate-images.mjs personal-care   # one or more by name
 *   node scripts/generate-images.mjs --list          # show job names
 *
 * Existing files are skipped unless --force is passed, so a re-run after a
 * failure does not pay for images that already landed.
 */

import { writeFile, mkdir, access, readFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(HERE, "..");
const OUT = join(ROOT, "public", "images");
const ENV = resolve(ROOT, "..", ".env");

/* ---- The shared brief -------------------------------------------------- */

const STYLE = `LIGHT AND COLOUR, get this right: a flood of clean cool-white daylight from large windows, the room bright enough that nothing is in shadow. High key. Crisp, airy, modern. Colours are true and fresh — white walls read white, not cream. Absolutely no warm amber cast, no golden-hour glow, no sepia or vintage tone, no nostalgic filter, no soft haze, no dimness.

Shot on a Canon EOS R5 with an 85mm f/1.4 lens at f/2.8, sharp subjects against a softly blurred background. Photorealistic, hyperrealistic skin texture with visible pores and natural fine lines. Candid documentary photography, unposed, caught mid-moment, subjects looking at each other and never at the camera. Genuine natural laughter, not a posed smile. The support worker wears a burgundy red tunic with white piping at the collar and cuffs and a small embroidered heart logo on the left chest. A real, bright, contemporary British home. No signage, no wall text, no watermark, no captions.`;

const AVOID = `Avoid entirely: posed shots, anyone looking at the camera, fake smiles, plastic or airbrushed skin, oversaturated or HDR grading, hospital wards, scrubs, stethoscopes, medical equipment, a carer standing behind someone with hands on their shoulders, anything patronising, dark, dim, brown, sepia, amber, golden-hour or candlelit light, vintage or faded film looks, American settings, malformed hands, and any text or writing.`;

/* Where the subjects sit, so the heading has somewhere to go. */
const WIDE = `COMPOSITION, which matters more than anything else in this brief: a wide cinematic 16:9 frame in which the LEFT THIRD IS COMPLETELY EMPTY of people — nothing there but plain wall, a sunlit window, or soft out-of-focus background. Every person sits in the right two-thirds, shot from far enough back that there is clear headroom above the tallest head and no head is ever cropped. Think of a magazine spread where a headline will be laid over the empty left side.`;

const SQUARE = `Composed as a square frame with the subjects centred and generous margin on all sides.`;

const JOBS = [
  // ---- Service pages -------------------------------------------------
  { name: "personal-care", size: "1536x1024", frame: WIDE, scene:
    `A man in his 70s in a dressing gown standing at his own bathroom sink shaving, concentrating on the mirror. A male support worker stands back in the doorway, relaxed, hands free, ready only if needed. Bright ordinary British bathroom, frosted window, towels on a rail.` },

  { name: "adults-over-65", size: "1536x1024", frame: WIDE, scene:
    `A woman in her late 70s and a female support worker walking slowly together along a sunlit residential pavement, the older woman using a walking stick, both talking and laughing. Red-brick houses, autumn trees, blue sky. She is setting the pace.` },

  { name: "adults-under-65", size: "1536x1024", frame: WIDE, scene:
    `A woman in her 40s with multiple sclerosis sitting at her kitchen table working on a laptop, mid-conversation and laughing with a female support worker who is putting shopping away behind her. Bright modern British kitchen, work papers on the table.` },

  { name: "dementia-care", size: "1536x1024", frame: WIDE, scene:
    `An elderly woman in her 80s and a female support worker sitting close together on a sofa with an open photo album across both their laps. The older woman's finger rests on one photograph, her expression searching. The carer watches her face, patient, waiting rather than prompting. Soft window light from the left.` },

  { name: "physical-disabilities", size: "1536x1024", frame: WIDE, scene:
    `A man in his 50s who uses a wheelchair reaching independently for a mug at his kitchen worktop. A male support worker stands nearby with his hands free, alert but not intervening. Bright British kitchen with lowered worktops, window over the sink.` },

  { name: "sensory-impairments", size: "1536x1024", frame: WIDE, scene:
    `A woman in her 60s who is blind standing in her own kitchen making tea, one hand resting on the worktop edge to orient herself, confident and unhurried. A female support worker stands a few feet away speaking to her, hands free. Bright tidy British kitchen.` },

  { name: "supported-living", size: "1536x1024", frame: WIDE, scene:
    `A young man in his 20s with a learning disability loading his own washing machine in his small flat, concentrating on the task. A male support worker leans against the doorframe a few feet away, chatting with him. Bright modern British flat, posters on the wall, plants on the windowsill.` },

  { name: "learning-disability", size: "1536x1024", frame: WIDE, scene:
    `A young woman in her 20s with Down syndrome sitting at a table painting in a sketchbook, absorbed in her work. A female support worker sits across from her with a mug of tea, leaning in to look at the painting, delighted. Bright living room, large window, colourful artwork on the wall.` },

  { name: "hospital-discharge", size: "1536x1024", frame: WIDE, scene:
    `A man in his late 70s in a cardigan settling back into his own armchair, a hospital wristband still on his wrist, visible relief in his posture. A female support worker sets a mug of tea and his glasses within reach on the side table. A small packed overnight bag by the door behind. Warm afternoon light.` },

  { name: "live-in-care", size: "1536x1024", frame: WIDE, scene:
    `An elderly couple in their 80s sitting together at their kitchen table having breakfast, talking to each other. A female support worker stands at the counter behind making toast, part of the household rather than a visitor. Bright ordinary British kitchen, morning light.` },

  // ---- Everything else ------------------------------------------------
  { name: "hero-kitchen", size: "1536x1024", frame: WIDE, scene:
    `A woman in her 40s who uses a wheelchair sitting at her kitchen table with a laptop and a mug of tea, head thrown back mid-laugh. A female support worker stands beside the table holding her own mug, laughing with her. Bright British kitchen, large window with plants on the sill.` },

  { name: "hero-park", size: "1536x1024", frame: WIDE, scene:
    `A young man in his 20s with Down syndrome in a green hoodie carrying a football, walking through a sunlit autumn park beside a male support worker. Both mid-laugh, looking at each other, walking at the same pace. Blue sky, golden autumn trees.` },

  { name: "hero-main", size: "1536x1024", frame: WIDE, scene:
    `An elderly man in his 80s in a flat cap and waxed jacket resting both hands on a walking stick, sitting on a park bench beside a female support worker. Both turned toward each other mid-laugh. Her hand rests on the bench behind him, not on him. Sunlit parkland by a lake, mature trees, distant hills.` },

  { name: "about-garden", size: "1536x1024", frame: WIDE, scene:
    `A woman in her 60s tending shrubs in her own back garden on a bright autumn morning, secateurs in hand, absorbed in the task. A female support worker stands a few feet away with a mug of tea, watching and laughing with her, not helping. Yorkshire back garden, brick wall, washing line, autumn colour, distant hills.` },

  { name: "carer-hallway", size: "1536x1024", frame: WIDE, scene:
    `A female support worker in her 40s standing in a bright domestic hallway, mid-conversation and laughing, holding a folder of care notes. Warm natural light from a front door with frosted glass. Coats on hooks, patterned carpet, a family photograph on the wall. She is at ease and clearly at work.` },

  { name: "carers-office", size: "1536x1024", frame: WIDE, scene:
    `Two support workers sitting at a small round table in a bright office, one showing the other something on a tablet, both concentrating and relaxed. A window with daylight behind them, plants, a noticeboard. Ordinary small business unit, not a corporate boardroom.` },

  { name: "how-we-work-hero", size: "1536x1024", frame: WIDE, scene:
    `A female assessor in her 40s sitting on a sofa in a client's living room with a folder open on her lap, mid-conversation with a woman in her 60s in an armchair opposite who is talking and gesturing as she explains something. The assessor is listening and making a note. Two mugs of tea on a side table. Bright ordinary British living room.` },

  { name: "services-hero", size: "1536x1024", frame: WIDE, scene:
    `A support worker and three clients of different ages doing a jigsaw together at a table in a bright, homely lounge — a young man in his 20s, an older woman in her 80s, and a younger woman. All laughing together. Large window with autumn trees beyond, plants, a sideboard. Domestic and warm, not institutional.` },

  { name: "services-cooking", size: "1024x1024", frame: SQUARE, scene:
    `A man in his 30s with a physical disability chopping vegetables at his own kitchen counter, concentrating on the knife, laughing at something a female support worker has said as she stands nearby with her hands free. Bright British kitchen, sunlight, plants on the windowsill. He is clearly doing the cooking himself.` },
];

/* ---- Runner ------------------------------------------------------------ */

async function getKey() {
  const raw = await readFile(ENV, "utf8");
  const line = raw.split(/\r?\n/).find((l) => /api_key/i.test(l));
  if (!line) throw new Error(`No API key found in ${ENV}`);
  return line.split("=").slice(1).join("=").trim().replace(/^["']|["']$/g, "");
}

async function exists(path) {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

/**
 * Reference images.
 *
 * The key to consistency. A text prompt alone drifts between calls: three
 * attempts produced a sepia shot, a second sepia shot, and a clinical
 * white-walled one, none of which sat beside the existing photography.
 * /v1/images/edits accepts several images as style references, so every
 * generation is anchored to photographs that already have the look: the
 * burgundy tunic with its logo, lived-in British rooms, bright daylight.
 */
const REFERENCES = [
  "live-in-care.png",
  "hospital-discharge.png",
  "about-garden.png",
];

async function generate(job, key, refs) {
  const prompt = `${job.frame}

${job.scene}

${STYLE}

${AVOID}

Match the uniform, lighting and overall look of the reference images exactly. Same burgundy tunic with white piping and the embroidered logo, same bright natural daylight, same lived-in British home with real furniture, rugs, plants and framed photographs. This is a new scene in the same shoot.`;

  const form = new FormData();
  form.append("model", "gpt-image-1");
  form.append("prompt", prompt);
  form.append("n", "1");
  form.append("size", job.size);
  form.append("quality", "high");
  form.append("input_fidelity", "low");

  for (const ref of refs) {
    form.append(
      "image[]",
      new Blob([ref.bytes], { type: "image/png" }),
      ref.name
    );
  }

  const res = await fetch("https://api.openai.com/v1/images/edits", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}` },
    body: form,
  });

  if (!res.ok) {
    throw new Error(`${res.status} ${(await res.text()).slice(0, 300)}`);
  }

  const json = await res.json();
  const b64 = json?.data?.[0]?.b64_json;
  if (!b64) throw new Error("No image data in response");

  await mkdir(OUT, { recursive: true });
  await writeFile(join(OUT, `${job.name}.png`), Buffer.from(b64, "base64"));
}

/** Load the reference photographs once, not per job. */
async function loadReferences(excludeName) {
  const picked = REFERENCES.filter((f) => f !== `${excludeName}.png`);
  const out = [];
  for (const name of picked) {
    try {
      out.push({ name, bytes: await readFile(join(OUT, name)) });
    } catch {
      /* A missing reference is not fatal; the others still anchor the look. */
    }
  }
  return out;
}

async function main() {
  const args = process.argv.slice(2);

  if (args.includes("--list")) {
    JOBS.forEach((j) => console.log(j.name));
    return;
  }

  const force = args.includes("--force");
  const wanted = args.filter((a) => !a.startsWith("--"));
  const jobs = wanted.length
    ? JOBS.filter((j) => wanted.includes(j.name))
    : JOBS;

  if (!jobs.length) {
    console.error("No matching jobs. Try --list.");
    process.exitCode = 1;
    return;
  }

  const key = await getKey();
  let done = 0;
  let failed = 0;

  for (const [i, job] of jobs.entries()) {
    const target = join(OUT, `${job.name}.png`);
    const label = `[${i + 1}/${jobs.length}] ${job.name}`;

    if (!force && (await exists(target))) {
      console.log(`${label} — exists, skipping (use --force to replace)`);
      continue;
    }

    process.stdout.write(`${label} … `);
    try {
      const refs = await loadReferences(job.name);
      if (!refs.length) throw new Error("No reference images available");
      await generate(job, key, refs);
      console.log("done");
      done++;
    } catch (err) {
      console.log(`FAILED: ${err.message}`);
      failed++;
    }
  }

  console.log(`\n${done} generated, ${failed} failed.`);
  if (failed) process.exitCode = 1;
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
