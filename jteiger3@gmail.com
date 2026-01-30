<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>YES AND DESIGN STUDIO</title>

<style>
  :root{
    --bg: #0f0f0f;
    --text: #ffffff;

    /* Big, screen-filling but safe for long words */
    --headline-size: clamp(42px, 7vw, 110px);
    --tracking: 0.06em;

    /* Slot lane width: wide enough for COLLABORATION, but responsive */
    --slot-width: clamp(9ch, 22vw, 16ch);

    /* line-height used for the step animation */
    --lh: 1.08;
  }

  html, body {
    margin: 0;
    height: 100%;
    background: var(--bg);
    color: var(--text);
    font-family: Helvetica, Arial, sans-serif;
  }

  /* Center the “block” in the viewport without creating a dead void */
  .stage{
    min-height: 100vh;
    display: grid;
    place-items: center;
    padding: 6vh 6vw; /* keeps long words from touching edges */
  }

  /* Cohesive composition: wordmark + coming soon as one unit */
  .wrap{
    display: grid;
    justify-items: center;
    gap: 18px;
  }

  /* The main line: YES AND [ROTATING WORD] */
  .wordmark{
    display: flex;
    align-items: baseline;       /* keeps it sentence-like */
    justify-content: center;     /* centers the whole phrase as a unit */
    gap: 0.45em;
    font-size: var(--headline-size);
    font-weight: 600;
    letter-spacing: var(--tracking);
    text-transform: uppercase;
    white-space: nowrap;
  }

  .static{
    flex: 0 0 auto;
  }

  /* Fixed “lane” so YES AND never shifts left/right */
  .slot{
    width: var(--slot-width);
    height: calc(1em * var(--lh));
    overflow: hidden;
    position: relative;
  }

  .slot-inner{
    display: flex;
    flex-direction: column;
    animation: slotSteps 14s steps(5, end) infinite;
    will-change: transform;
  }

  .slot-inner span{
    height: calc(1em * var(--lh));
    line-height: calc(1em * var(--lh));
    white-space: nowrap;
  }

  /* Colors */
  .design { color: #ffffff; }
  .craft { color: #d08c60; }
  .collaboration { color: #7aaedc; }
  .possibility { color: #9b7edc; }
  .joy { color: #f5c400; }

  /* 6 lines listed, but we step through 5 moves (to the duplicate DESIGN).
     Travel distance = 5 * lineHeight */
  @keyframes slotSteps{
    from { transform: translateY(0); }
    to   { transform: translateY(calc(-5 * (1em * var(--lh)))); }
  }

  .coming-soon{
    font-size: clamp(12px, 1.4vw, 16px);
    letter-spacing: 0.22em;
    text-transform: uppercase;
    opacity: 0.72;
  }

  /* Optional: subtle top/bottom “aperture” so the slot feels intentional */
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
    background: linear-gradient(to bottom, var(--bg), transparent);
  }
  .slot::after{
    bottom:0;
    background: linear-gradient(to top, var(--bg), transparent);
  }

  /* Small screens: let it breathe and avoid clipping */
  @media (max-width: 520px){
    :root{
      --slot-width: clamp(10ch, 44vw, 18ch);
      --tracking: 0.05em;
    }
    .wordmark{
      gap: 0.35em;
    }
  }

  @media (prefers-reduced-motion: reduce){
    .slot-inner{ animation: none; }
  }
</style>
</head>

<body>
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
            <span class="design">DESIGN</span> <!-- duplicate for seamless loop -->
          </span>
        </span>
      </div>

      <div class="coming-soon">COMING SOON</div>
    </div>
  </main>
</body>
</html>
