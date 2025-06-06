<template>
    <Page class="gap-y-12">
        <Section class-content="gap-y-2">
            <h1>Hotpot - Nuxt UI Theming</h1>
            <p>Let's cook something nice with Nuxt UI</p>
        </Section>
        <Section start title="What's this ?">
            <p>It's a pain to find the right colors for your website and even worse to configure them all in Nuxt UI.</p>
            <p>In this pot, mix the colors you want and the code for your light and dark theme will be automatically generated.</p>
            <p class="mt-2">Curious how I did it ? It's open-source : <ULink to="https://github.com/ribbityfrog/hotpot" external>https://github.com/ribbityfrog/hotpot</ULink></p>
        </Section>
        <Section start title="How to use">
            <p>I turned the fire on already :</p>
            <p>1/ Express yourself artistically in <ULink to="/theming">Theming</ULink></p>
            <p>2/ Sneakily retrieve the code in <ULink to="/generate">Generate</ULink></p>
        </Section>
        <Section start title="Next steps">
            <p>If you like it, please <ULink to="https://github.com/ribbityfrog/hotpot" external>star it on GitHub</ULink></p>
            <p>Here is the roadmap if this project has any form of success:</p>
            <ul class="list-disc list-inside ml-4">
                <li>Adding some Components pages to have more samples</li>
                <li>Better shades calculation (now it sucks, I should use HSL to have cleaner shades)</li>
                <li>Contrast calculation for accessibility, like <ULink to="https://webaim.org/resources/contrastchecker/">WebAIM</ULink></li>
                <li>More tailwind theming (rounded, shadows and others)</li>
                <li>Components theming and generating an <i>app.config.ts</i></li> 
            </ul>
        </Section>
        <Section start title="Suggestions">
            <p>Sure :)</p>
            <p>You can reach me on the <ULink>Nuxt Discord</ULink> or email me at <ULink to="mailto:contact@steamfrog.net">contact@steamfrog.net</ULink></p>
        </Section>
    </Page>
</template>
