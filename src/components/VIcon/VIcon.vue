<template>
	<p>{{ name }}</p>
</template>

<script lang="ts">
import { createComponent, reactive, computed } from "@vue/composition-api";

type CustomIcon = {
	key: string;
	svg: string;
};

type Props = {
	name: string;
	color: string;
	size: number;
	xSmall: boolean;
	small: boolean;
	large: boolean;
	xLarge: boolean;
};

const customIcons: CustomIcon[] = [];

const requireSVG = require.context("../../assets/icons", false, /\w+\.(svg)$/);

requireSVG.keys().forEach(fileName => {
	let iconName: string;
	const fileNameParts: string[] = fileName.split("/");
	iconName = fileNameParts[fileNameParts.length - 1].replace(/\.[^/.]+$/, "");
	const customIcon: CustomIcon = {
		key: iconName,
		svg: requireSVG(fileName)
	};
	customIcons.push(customIcon);
});

export default createComponent({
	props: ["name"],
	setup(props: Props) {}
});
</script>

<style lang="scss"></style>
