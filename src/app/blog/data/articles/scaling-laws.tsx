import { Article } from '../index';

const article: Article = {
  slug: 'chinchilla-scaling-laws',
  title: {
    en: 'LLM Pre-training and Scaling Laws',
    es: 'Pre-entrenamiento de LLMs y Scaling Laws',
  },
  description: {
    en: 'Every LLM lab has a fixed pre-training budget. How do you allocate it between model size and data?',
    es: 'Cada laboratorio de LLMs tiene un presupuesto fijo de pre-entrenamiento. ¿Cómo se reparte entre tamaño del modelo y datos?',
  },
  date: '2026-04-19',
  readingTime: 5,
  image: '/pngtree-cartoon-cute-chinchilla-animal-png-image_13162885.png',
  hideLanguageToggle: true,
  tags: ['AI', 'scaling laws', 'chinchilla', 'LLMs'],
  content: {
    en: {
      sections: [
        {
          type: 'tldr',
          content:
            "TL;DR: With $10M and a fixed compute budget, picking your model size locks in how much data you can feed it. DeepMind's Chinchilla paper said 20 tokens per parameter is the sweet spot. The industry now goes 200:1 or further. Why? Inference.",
        },

        {
          type: 'paragraph',
          content:
            "Imagine we've raised $10M and we want to pre-train an LLM from scratch with that money.",
        },
        {
          type: 'paragraph',
          content:
            'Today H200s cost $2.32/hour, so that buys us about 4,310,000 GPU-hours.',
        },
        {
          type: 'equation',
          content: '4,310,000 h × 3,600 s × 3.95×10¹⁴ FLOPs/s  ≈  6×10²⁴ FLOPs',
        },
        {
          type: 'callout',
          variant: 'info',
          content:
            'H200 peak: ~989 TFLOPs (BF16). Real training runs use ~40% of that → ~395 TFLOPs/sec per GPU.',
        },
        {
          type: 'paragraph',
          content: 'Our compute budget will be **6×10²⁴ total FLOPs**.',
        },

        {
          type: 'paragraph',
          content:
            "So now we need to decide the model size we're going to build. And how much data?",
        },
        {
          type: 'paragraph',
          content:
            "In practice when we choose the transformer model size and we have a fixed compute, we've automatically picked how much data we can feed it.",
        },
        {
          type: 'paragraph',
          content: "There's a rule out there that says:",
        },
        {
          type: 'equation',
          content: 'Data  =  Compute / (6 × Parameters)',
        },
        {
          type: 'paragraph',
          content:
            "So let's go for a 40B model, a random choice. We jump on [Common Crawl](https://commoncrawl.org/), scrape a mountain of text, and start training. We'll burn the whole $10M budget processing **25 trillion tokens**. Roughly everything usable on the open web.",
        },
        {
          type: 'paragraph',
          content: 'What if we picked a bigger model? These are the numbers.',
        },
        {
          type: 'list',
          content: '',
          items: [
            '40B → 25T tokens.',
            '70B → 14.3T tokens.',
            '224B → 4.5T tokens.',
            '500B → 2T tokens.',
          ],
        },
        {
          type: 'paragraph',
          content: 'Which one ends up with the best model?',
        },

        {
          type: 'chart',
          chartId: 'chinchilla',
          content: 'Training loss vs. parameter count — at a fixed $10M compute budget.',
          alt: 'More params = less data = running out of time to learn. Less params = tons of data = model too dumb to use it.',
          meta: {
            yLabel: 'loss',
            sweetSpotLabel: 'sweet spot???',
          },
        },

        {
          type: 'paragraph',
          content:
            'Where is the sweet spot? Can we predict which one will be the best for us?',
        },
        {
          type: 'paragraph',
          content:
            'This is the question a team at DeepMind set out to answer in early 2022, in a paper that would reshape how the entire industry thought about training large models. They called the resulting model **Chinchilla**.',
        },
        {
          type: 'paragraph',
          content:
            'They trained over 400 models, combining number of parameters and tokens. They discovered that **20:1** is the sweet spot.',
        },
        {
          type: 'paragraph',
          content: 'We have a fixed budget X? Then take **20 tokens per model parameter**.',
        },

        {
          type: 'heading',
          level: 2,
          content: 'So, this is the Industry Standard in 2026?',
        },
        {
          type: 'paragraph',
          content: '**Not really...**',
        },
        {
          type: 'paragraph',
          content:
            "20:1 nails it if all you want is the best model per training dollar. Great for research. But the industry doesn't just train models, it serves them. And that's where ✨inference✨ comes in.",
        },
        {
          type: 'paragraph',
          content: 'A bigger model → more cost in inference. Forever. Every token, every user, every day.',
        },
        {
          type: 'paragraph',
          content:
            'A lot of things matter here, not only the size: the architecture, MoE, speculative decoding…',
        },
        {
          type: 'paragraph',
          content:
            "And revenue? Maybe a bigger, smarter model brings in more users paying. The equation isn't fully closed.",
        },
        {
          type: 'paragraph',
          content:
            'So we need smaller models. The industry tends to go **200:1** or even further.',
        },

        {
          type: 'heading',
          level: 2,
          content: 'Will it plateau?',
        },
        {
          type: 'paragraph',
          content:
            'Back in 2024 there was no sign of it. More compute + more parameters + more data → loss kept going down.',
        },
        {
          type: 'paragraph',
          content:
            "Now in 2026, a lot of people say the scaling law is plateauing. It really isn't.",
        },
        {
          type: 'paragraph',
          content:
            'Here is the trick. On the typical scaling law plot the Y axis is linear, but the X axis is **log10**. Plot the same data with a linear X and you see a brutal cliff that flattens out almost immediately. Plot it on log10 and it is still a clean line going down.',
        },
        {
          type: 'chart',
          chartId: 'plateau',
          content: 'Same scaling law. Two axes.',
          alt: 'Linear X looks plateaued. Log10 X is still going down.',
          meta: {
            linearLabel: 'linear X',
            logLabel: 'log10 X',
          },
        },
        {
          type: 'paragraph',
          content:
            "So no, the law itself isn't breaking. The catch is what each step on that log axis costs us. The scaling law won't stall, but the **log will break us**. We will need 10× compute to keep going.",
        },
        {
          type: 'paragraph',
          content:
            'And 10× compute isn\'t cheap, and is not fast. Most estimates put us there around **2028**.',
        },

        {
          type: 'heading',
          level: 2,
          content: 'References',
        },
        {
          type: 'list',
          content: '',
          items: [
            "Hoffmann et al. (2022) — [Training Compute-Optimal Large Language Models](https://arxiv.org/abs/2203.15556) (the Chinchilla paper).",
            "Sardana, Frankle et al. (2024) — [Beyond Chinchilla-Optimal: Accounting for Inference in Language Model Scaling Laws](https://arxiv.org/abs/2401.00448).",
            "Jingyi Qi — [Scaling Law won't stall, but scaling law's log will break us](https://j-qi.medium.com/scaling-law-wont-stall-but-scaling-law-s-log-will-break-us-e4d036b483f2).",
          ],
        },
      ],
    },
    es: {
      sections: [
        {
          type: 'tldr',
          content:
            'TL;DR: Con $10M y un presupuesto de cómputo fijo, elegir el tamaño del modelo te fija cuántos datos puedes meterle. El paper Chinchilla de DeepMind dijo que 20 tokens por parámetro es el punto óptimo. La industria hoy va a 200:1 o más. ¿Por qué? Inferencia.',
        },

        {
          type: 'paragraph',
          content:
            'Imagina que hemos levantado **$10M** y queremos construir un LLM desde cero con ese dinero.',
        },
        {
          type: 'paragraph',
          content:
            'Hoy las H200 cuestan **$2.32/hora**, así que eso nos compra unas **4.310.000 horas-GPU**.',
        },
        {
          type: 'equation',
          content: '4.310.000 h × 3.600 s × 3,95×10¹⁴ FLOPs/s  ≈  6×10²⁴ FLOPs',
        },
        {
          type: 'callout',
          variant: 'info',
          content:
            'Pico de la H200: ~989 TFLOPs (BF16). Los entrenamientos reales aprovechan ~40% → ~395 TFLOPs/seg por GPU.',
        },
        {
          type: 'paragraph',
          content: 'Nuestro presupuesto de cómputo serán **6×10²⁴ FLOPs totales**.',
        },

        {
          type: 'paragraph',
          content:
            'Ahora hay que decidir el tamaño del modelo que vamos a construir. ¿Y cuántos datos?',
        },
        {
          type: 'paragraph',
          content:
            'En la práctica, cuando elegimos el tamaño del transformer y tenemos un cómputo fijo, hemos elegido automáticamente cuántos datos podemos meterle.',
        },
        {
          type: 'paragraph',
          content: 'Hay una regla por ahí que dice:',
        },
        {
          type: 'equation',
          content: 'Datos  =  Cómputo / (6 × Parámetros)',
        },
        {
          type: 'paragraph',
          content:
            'Vamos a por un modelo de 40B, una elección aleatoria. Nos lanzamos a [Common Crawl](https://commoncrawl.org/), scrapeamos una montaña de texto y empezamos a entrenar. Quemaremos los $10M procesando **25 billones (trillions) de tokens**. Aproximadamente todo lo aprovechable de la web abierta.',
        },
        {
          type: 'paragraph',
          content: '¿Y si eligiéramos un modelo más grande? Estos son los números.',
        },
        {
          type: 'list',
          content: '',
          items: [
            '40B → 25T tokens.',
            '70B → 14,3T tokens.',
            '224B → 4,5T tokens.',
            '500B → 2T tokens.',
          ],
        },
        {
          type: 'paragraph',
          content: '¿Cuál acaba dando el mejor modelo?',
        },

        {
          type: 'chart',
          chartId: 'chinchilla',
          content: 'Loss de entrenamiento vs. número de parámetros — con un presupuesto fijo de $10M.',
          alt: 'Más parámetros = menos datos = no da tiempo a aprender. Menos parámetros = un montón de datos = modelo demasiado tonto para aprovecharlos. En algún punto intermedio...',
          meta: {
            yLabel: 'loss',
            sweetSpotLabel: 'punto óptimo???',
          },
        },

        {
          type: 'paragraph',
          content:
            '¿Dónde está el punto óptimo? ¿Podemos predecir cuál va a ser el mejor para nosotros?',
        },
        {
          type: 'paragraph',
          content:
            'Esta es la pregunta que un equipo de DeepMind se propuso responder a principios de 2022, en un paper que cambiaría la forma en que toda la industria pensaba sobre entrenar modelos grandes. Al modelo resultante lo llamaron **Chinchilla**.',
        },
        {
          type: 'paragraph',
          content:
            'Entrenaron más de 400 modelos, combinando cantidad de parámetros y tokens. Descubrieron que **20:1** es el punto óptimo.',
        },
        {
          type: 'paragraph',
          content: '¿Tenemos un presupuesto X fijo? Pues cojamos **20 tokens por parámetro** del modelo.',
        },

        {
          type: 'heading',
          level: 2,
          content: 'Entonces, ¿este es el estándar de la industria en 2026?',
        },
        {
          type: 'paragraph',
          content: '**Para nada...**',
        },
        {
          type: 'paragraph',
          content:
            '20:1 lo clava si solo quieres el mejor modelo por dólar de entrenamiento. Genial para investigación. Pero la industria no solo entrena modelos, los sirve. Y ahí es donde entra la ✨inferencia✨.',
        },
        {
          type: 'paragraph',
          content: 'Un modelo más grande → más coste en inferencia. Para siempre. Cada token, cada usuario, cada día.',
        },
        {
          type: 'paragraph',
          content:
            'Aquí importan muchas cosas: la arquitectura, MoE, speculative decoding…',
        },
        {
          type: 'paragraph',
          content:
            '¿Y los ingresos? Quizá un modelo más grande y más listo trae más usuarios pagando. La ecuación no está del todo cerrada.',
        },
        {
          type: 'paragraph',
          content:
            'Así que necesitamos modelos más pequeños, sobreentrenados con más datos. La industria tiende a ir a **200:1** o incluso más.',
        },

        {
          type: 'heading',
          level: 2,
          content: '¿Va a hacer plateau?',
        },
        {
          type: 'paragraph',
          content:
            'En 2024 no había ni rastro de ello. Más cómputo + más parámetros + más datos → la loss seguía bajando.',
        },
        {
          type: 'paragraph',
          content:
            'Ahora en 2026, mucha gente dice que la scaling law se está estancando. Realmente no.',
        },
        {
          type: 'paragraph',
          content:
            'Aquí está la trampa. En la gráfica típica de scaling laws el eje Y es lineal, pero el eje X está en **log10**. Pinta los mismos datos con X lineal y verás un acantilado brutal que se aplana casi inmediatamente. Píntalos en log10 y sigue siendo una recta limpia bajando.',
        },
        {
          type: 'chart',
          chartId: 'plateau',
          content: 'La misma scaling law. Dos ejes.',
          alt: 'Mismos modelos, mismos números. X lineal parece plateau. X log10 sigue bajando. La trampa: cada tick a la derecha en log = 10× más cómputo.',
          meta: {
            linearLabel: 'X lineal',
            logLabel: 'X log10',
          },
        },
        {
          type: 'paragraph',
          content:
            'Así que no, la ley en sí no se rompe. La trampa es lo que nos cuesta cada paso en ese eje log. La scaling law no se va a estancar, pero el **log nos va a romper**. Vamos a necesitar 10× cómputo para seguir avanzando.',
        },
        {
          type: 'paragraph',
          content:
            'Y 10× cómputo no es barato, y no llega rápido. La mayoría de estimaciones lo sitúan hacia **2028**.',
        },

        {
          type: 'heading',
          level: 2,
          content: 'Referencias',
        },
        {
          type: 'list',
          content: '',
          items: [
            'Hoffmann et al. (2022) — [Training Compute-Optimal Large Language Models](https://arxiv.org/abs/2203.15556) (el paper de Chinchilla).',
            'Sardana, Frankle et al. (2024) — [Beyond Chinchilla-Optimal: Accounting for Inference in Language Model Scaling Laws](https://arxiv.org/abs/2401.00448).',
            "Jingyi Qi — [Scaling Law won't stall, but scaling law's log will break us](https://j-qi.medium.com/scaling-law-wont-stall-but-scaling-law-s-log-will-break-us-e4d036b483f2).",
          ],
        },
      ],
    },
  },
};

export default article;
