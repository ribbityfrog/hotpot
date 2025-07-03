<template>
    <Page class="gap-y-8">
        <Section class-content="gap-y-2">
            <h1>Hotpot - Nuxt UI Theming</h1>
            <p>Let's cook something nice with and for <ULink to="https://ui.nuxt.com/" target="_blank" external>Nuxt UI</ULink></p>
        </Section>
        <Section start title="What's this ?">
            <p>It's a pain to find the right colors for your website and even worse to configure them all in Nuxt UI.</p>
            <p>In this pot, mix the colors you want and the code for your light and dark theme will be automatically generated.</p>
            <strong>It's not mobile responsive yet, given the goal and the code it produces, I consider it not a priority</strong>
            <p class="mt-2"><ULink to="https://github.com/ribbityfrog/hotpot" target="_blank" external>https://github.com/ribbityfrog/hotpot</ULink></p>
        </Section>
        <Section start title="How to use">
            <p>I turned the fire on already :</p>
            <ol class="list-decimal list-inside ml-4">
                <li><ULink to="/styling">Colors</ULink>, choose your colors and style</li>
                <li>Shaping (soon), shape pour components the way you like them</li>
                <li>Samples, fine tune your design with some samples</li>
                <li><ULink to="/generate">Generate</ULink> the Nuxt UI configuration code</li>
            </ol>
            <strong>The styling is constantly available in the bottom menu alongside with some options</strong>
        </Section>
        <Section start title="Next steps">
            <p>Here the next steps and some ideas I have in mind:</p>
            <ul class="list-disc list-inside ml-4">
                <li>Components customisation (shaping)</li>
                <li>Export / import your theme including the shaping</li>
                <li>Contrast calculation for accessibility, like <ULink to="https://webaim.org/resources/contrastchecker/" target="_blank" external>WebAIM</ULink></li>
                <li>Better tints calculation and control (now it sucks, I should use HSL to have cleaner tints)</li>
            </ul>
        </Section>
        <Section start title="I have suggestions">
            <p>Thanks :)</p>
            <p>You can reach me on the <ULink>Nuxt Discord</ULink> or email me at <ULink to="mailto:contact@frogpond.dev" target="_blank" external>contact@frogpond.dev</ULink></p>
        </Section>
        <Section start title="Contributors" class-content="gap-y-2">
            <p>Feel free to contact me if you want to contribute to the project</p>
            <p>If you think your styling is cool, feel free to share ne the link, I'll create a gallery later :)</p>
            <p>Thanks to <ULink to="https://github.com/bertyn99">@bertyn99</ULink> who sparkled the idea</p>
        </Section>
    </Page>
</template>
