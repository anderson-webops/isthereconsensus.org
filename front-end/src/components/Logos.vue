<template xmlns:children="http://www.w3.org/1999/xhtml" xmlns:hover="http://www.w3.org/1999/xhtml">
	<div text-2xl font-300 inline-flex cursor-default>
		<div flex flex-col children:mx-auto>
			<img h-18 w-18 inline-block src="/nuxt.svg" alt="" />
			<span text-green-400 mt--2>Nuxt 4</span>
		</div>
		<div text="3xl gray4" m="x-4 y-auto" i-carbon-add transform transition-all-500 hover:rotate-135 />
		<div flex flex-col children:mx-auto>
			<img h-18 w-18 inline-block src="/vite.png" alt="" />
			<span text-purple-500 mt--2>Vitesse</span>
		</div>
	</div>
</template>
