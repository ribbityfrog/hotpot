<template>
    <Page class="gap-y-8">
        <Section class-content="gap-y-2">
            <h1>Hotpot - Nuxt UI Theming</h1>
            <p>Let's cook something nice with and for <ULink to="https://ui.nuxt.com/" target="_blank" external>Nuxt UI</ULink></p>
        </Section>
        <Section class="bg-primary-100 dark:bg-primary-800 text-center py-4" class-content="gap-y-1">
            <p>It would be great to have a simple tool to theme Nuxt UI easily</p>
            <p>It would be even better to generate th associated code, ready to be copy/pasted in your project, right ?</p>
            <p>Well, there you go :)</p>
        </Section>
        <Section title="Ready to start ?" center-title class-content="gap-6">
            <Flex center-stretch class="justify-stretch gap-12 mt-4" wrap>
                <EditoCard :numero="1" title="Styling" description="Choose and setup your colors" link="/styling"/>
                <EditoCard
                    :numero="2"
                    title="Shaping"
                    description="Shape your components the way you like"
                    soon/>
                <EditoCard :numero="3" title="Samples" description="Choose and setup your colors" link="/sample/articles"/>
                <EditoCard :numero="4" title="Generate" description="Copy/paste the associated code in your project" link="/sample/articles"/>
            </Flex>
            <p class="text-info">The styling is constantly available in the bottom menu alongside with some options</p>
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
            <p>You can reach me on the <ULink to="https://discord.com/invite/nuxt" target="_blank" external>Nuxt Discord</ULink> or email me at <ULink to="mailto:contact@frogpond.dev" target="_blank" external>contact@frogpond.dev</ULink></p>
        </Section>
        <Section start title="Contributors" class-content="gap-y-2">
            <p>Feel free to contact me if you want to contribute to the project</p>
            <p>If you think your styling is cool, feel free to share ne the link, I'll create a gallery later :)</p>
            <p>Thanks to <ULink to="https://github.com/bertyn99">@bertyn99</ULink> who sparkled the idea</p>
        </Section>
    </Page>
</template>
