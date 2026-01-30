<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>YES AND DESIGN STUDIO</title>

<style>
  :root{
    /* Typography */
    --headline-size: clamp(44px, 7.5vw, 120px);
    --tracking: 0.06em;
    --lh: 1.08;

    /* Make this wide enough for your longest word + tracking */
    --slot-width: clamp(14ch, 34vw, 22ch);

    /* Layout */
    --pad-x: clamp(18px, 5vw, 72px);
    --pad-y: clamp(18px, 6vh, 80px);
  }

  html, body {
    margin: 0;
    height: 100%;
    font-family: Helvetica, Arial, sans-serif;
    color: #fff;
    overflow: hidden; /* prevents accidental scrollbars */
    background: #0b0c10;
  }

  /* ---------- Frosted glass / color morph background ---------- */
  .bg {
    position: fixed;
    inset: 0;
    overflow: hidden;
    background: radial-gradient(1200px 800px at 20% 20%, rgba(255,255,255,0.06), transparent 60%),
                radial-gradient(900px 700px at 80% 30%, rgba(255,255,255,0.05), transparent 60%),
                #0b0c10;
  }

  /* Color “blobs” that slowly morph/float */
  .bg::before,
  .bg::after{
    content:"";
    position: absolute;
    inset: -20%;
    filter: blur(60px);
    opacity: 0.75;
    transform: translate3d(0,0,0);
    will-change: transform;
    mix-blend-mode: screen;
  }

  .bg::before{
    background:
      radial-gradient(50% 40% at 25% 35%, rgba(98, 122, 255, 0.85), transparent 60%),
      radial-gradient(45% 35% at 55% 55%, rgba(255, 135, 80, 0.85), transparent 62%),
      radial-gradient(40% 35% at 75% 30%, rgba(120, 255, 214, 0.70), transparent 60%);
    animation: driftA 26s ease-in-out infinite;
  }

  .bg::after{
    background:
      radial-gradient(55% 40% at 35% 70%, rgba(180, 120, 255, 0.75), transparent 62%),
      radial-gradient(45% 40% at 75% 65%, rgba(255, 205, 95, 0.70), transparent 60%),
      radial-gradient(45% 35% at 65% 25%, rgba(80, 190, 255, 0.70), transparent 60%);
    animation: driftB 34s ease-in-out infinite;
    opacity: 0.65;
  }

  @keyframes driftA{
    0%   { transform: translate(-2%, -1%) scale(1.02) rotate(0deg); }
    50%  { transform: translate(3%,  2%) scale(1.08) rotate(8deg); }
    100% { transform: translate(-2%, -1%) scale(1.02) rotate(0deg); }
  }
  @keyframes driftB{
    0%   { transform: translate(2%,  1%) scale(1.05) rotate(0deg); }
    50%  { transform: translate(-3%, -2%) scale(1.10) rotate(-10deg); }
    100% { transform: translate(2%,  1%) scale(1.05) rotate(0deg); }
  }

  /* Frosted “glass” overlay */
  .glass {
    position: fixed;
    inset: 0;
    background: rgba(10, 10, 12, 0.35);
    backdrop-filter: blur(24px) saturate(130%);
    -webkit-backdrop-filter: blur(24px) saturate(130%);
  }

  /* ---------- Content ---------- */
  .stage{
    position: relative;
    z-index: 2;
    min-height: 100vh;
    display: grid;
    place-items: center;
    padding: var(--pad-y) var(--pad-x);
  }

  .wrap{
    display: grid;
    justify-items: center;
    gap: 18px;
    width: 100%;
  }

  /* A cohesive single-line sentence */
  .wordmark{
    display: flex;
    align-items: baseline;
    justify-content: center;
    gap: 0.45em;

    font-size: var(--headline-size);
    font-weight: 600;
    letter-spacing: var(--tracking);
    text-transform: uppercase;

    /* keep it on one line but avoid clipping at edges */
    max-width: 100%;
    white-space: nowrap;
  }

  .static{
    flex: 0 0 auto;
    color: #ffffff;
  }

  /* Fixed lane prevents YES AND shifting */
  .slot{
    width: var(--slot-width);
    height: calc(1em * var(--lh));
    overflow: hidden;
    position: relative;
  }

  .slot-inner{
    display: flex;
    flex-direction: column;
    animation: slotSteps 16s steps(5, end) infinite;
    will-change: transform;
  }

  .slot-inner span{
    height: calc(1em * var(--lh));
    line-height: calc(1em * var(--lh));
    white-space: nowrap;
  }

  /* Color system (feel free to tweak) */
  .design { color: #ffffff; }
  .craft { color: #d08c60; }
  .collaboration { color: #7aaedc; }
  .possibility { color: #9b7edc; }
  .joy { color: #f5c400; }

  /* 6 lines listed; move 5 steps to the duplicate DESIGN */
  @keyframes slotSteps{
    from { transform: translateY(0); }
    to   { transform: translateY(calc(-5 * (1em * var(--lh)))); }
  }

  /* Subtle aperture mask so the slot feels “machined” */
  .slot::before,
  .slot::after{
    content:"";
    position:absolute;
    left:0; right:0;
    height: 22%;
    pointer-events:none;
  }
  .slot::before{
    top:0;
    background: linear-gradient(to bottom, rgba(10,10,12,0.55), transparent);
  }
  .slot::after{
    bottom:0;
    background: linear-gradient(to top, rgba(10,10,12,0.55), transparent);
  }

  .coming-soon{
    font-size: clamp(12px, 1.4vw, 16px);
    letter-spacing: 0.22em;
    text-transform: uppercase;
    opacity: 0.72;
  }

  /* ---------- Responsive safety net ---------- */
  /* If the viewport is narrow, reduce tracking and widen slot a bit */
  @media (max-width: 700px){
    :root{
      --tracking: 0.045em;
      --slot-width: clamp(16ch, 48vw, 24ch);
      --headline-size: clamp(36px, 9vw, 86px);
    }
  }

  /* Respect reduced motion */
  @media (prefers-reduced-motion: reduce){
    .bg::before, .bg::after{ animation: none; }
    .slot-inner{ animation: none; }
  }
</style>
</head>

<body>
  <div class="bg"></div>
  <div class="glass"></div>

  <main class="stage">
    <div class="wrap">
      <div class="wordmark" aria-label="YES AND rotating words">
        <span class="static">YES AND</span>

        <span class="slot" aria-hidden="true">
          <span class="slot-inner">
            <span class="design">DESIGN</span>
            <span class="craft">CRAFT</span>
            <span class="collaboration">COLLABORATION</span>
            <span class="possibility">POSSIBILITY</span>
            <span class="joy">JOY</span>
            <span class="design">DESIGN</span>
          </span>
        </span>
      </div>

      <div class="coming-soon">COMING SOON</div>
    </div>
  </main>
</body>
</html>
