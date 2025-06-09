<template>
    <Page class="gap-y-12">
        <Section class-content="gap-y-2">
            <h1>Hotpot - Nuxt UI Theming</h1>
            <p>Let's cook something nice with <ULink to="https://ui.nuxt.com/" target="_blank" external>Nuxt UI</ULink></p>
        </Section>
        <Section start title="What's this ?">
            <p>It's a pain to find the right colors for your website and even worse to configure them all in Nuxt UI.</p>
            <p>In this pot, mix the colors you want and the code for your light and dark theme will be automatically generated.</p>
            <p class="mt-2">Curious how I did it ? It's open-source : <ULink to="https://github.com/ribbityfrog/hotpot" target="_blank" external>https://github.com/ribbityfrog/hotpot</ULink></p>
        </Section>
        <Section start title="How to use">
            <p>I turned the fire on already :</p>
            <ol class="list-decimal list-inside ml-4">
                <li>Choose your colors in <ULink to="/colors">Colors</ULink></li>
                <li>Shape your components</li>
                <li>Check the coherence with the samples</li>
                <li>Retrieve the code in <ULink to="/generate">Generate</ULink></li>
            </ol>
        </Section>
        <Section start title="Next steps">
            <p>If you like it, please <ULink target="_blank" to="https://github.com/ribbityfrog/hotpot" external>star it on GitHub</ULink></p>
            <p>Here is the roadmap if this project has any form of success:</p>
            <ul class="list-disc list-inside ml-4">
                <li>Adding some Components pages to have more samples (in progress)</li>
                <li>Export / Import shades and colors (from hotpot to hotpot only)</li>
                <li>Better shades calculation (now it sucks, I should use HSL to have cleaner shades)</li>
                <li>Contrast calculation for accessibility, like <ULink to="https://webaim.org/resources/contrastchecker/" target="_blank" external>WebAIM</ULink></li>
                <li>Being able to add Shades to be used in the Nuxt UI Shades/Colors and with Tailwind directly</li>
                <li>More tailwind theming (rounded, shadows and others)</li>
                <li>Components theming and generating an <i>app.config.ts</i></li> 
            </ul>
        </Section>
        <Section start title="I have suggestions">
            <p>Thanks :)</p>
            <p>You can reach me on the <ULink>Nuxt Discord</ULink> or email me at <ULink to="mailto:contact@steamfrog.net" target="_blank" external>contact@steamfrog.net</ULink></p>
        </Section>
        <Section start title="Thanks to">
            <p><ULink to="https://github.com/bertyn99">@bertyn99</ULink> for the original idea</p>
        </Section>
    </Page>
</template>
