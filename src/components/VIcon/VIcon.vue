<template>
	<span class="VIcon" :class="[sizeClass]" :style="{ color: colorStyle }">
		<i :class="{ outline }">{{ name }}</i>
	</span>
</template>

<script lang="ts">
import { VNode } from 'vue';
import { createComponent, reactive, computed } from '@vue/composition-api';
import requireContext from 'require-context.macro';

// Get all custom icons from the /src/assets/icons folder
// -------------------------------------------------------------------------------------------------
type CustomIcon = {
	[key: string]: VNode;
};

const iconComponents: CustomIcon = {};

// html-loader makes sure we require the svg files as a string of html instead of process it through
// webpack
const requireSVG = requireContext('./custom-icons', false, /\w+\.(svg)$/);

requireSVG.keys().forEach(fileName => {
	let iconName: string;
	const fileNameParts: string[] = fileName.split('/');
	iconName = fileNameParts[fileNameParts.length - 1].replace(/\.[^/.]+$/, '');
	iconComponents[`custom-icon-${iconName}`] = requireSVG(fileName);
});
// -------------------------------------------------------------------------------------------------

// TODO: Use iconComponents as locally registered components

export default createComponent({
	props: {
		name: {
			type: String,
			required: true
		},
		color: {
			type: String,
			required: true
		},
		outline: {
			type: Boolean,
			default: false
		},
		xSmall: {
			type: Boolean,
			default: false
		},
		small: {
			type: Boolean,
			default: false
		},
		large: {
			type: Boolean,
			default: false
		},
		xLarge: {
			type: Boolean,
			default: false
		}
	},

	setup(props) {
		const sizeClass = computed<string | null>(() => {
			if (props.xSmall) return 'x-small';
			if (props.small) return 'small';
			if (props.large) return 'large';
			if (props.xLarge) return 'x-large';
			return null;
		});

		const colorStyle = computed<string>(() => {
			return props.color.startsWith('--') ? `var(${props.color})` : props.color;
		});

		return {
			sizeClass,
			colorStyle
		};
	}
});
</script>

<style lang="scss">
.VIcon {
	position: relative;
	display: inline-block;
	font-size: 0;

	width: 24px;
	height: 24px;

	&.x-small {
		width: 12px;
		height: 12px;

		i {
			font-size: 12px;
		}
	}

	&.small {
		width: 18px;
		height: 18px;

		i {
			font-size: 18px;
		}
	}

	// Default is 24x24

	&.large {
		width: 36px;
		height: 36px;

		i {
			font-size: 36px;
		}
	}

	&.x-large {
		width: 48px;
		height: 48px;

		i {
			font-size: 48px;
		}
	}

	i {
		font-size: 24px;
		font-family: 'Material Icons';
		font-weight: normal;
		font-style: normal;
		display: inline-block;
		line-height: 1;
		text-transform: none;
		letter-spacing: normal;
		word-wrap: normal;
		white-space: nowrap;
		font-feature-settings: 'liga';
		vertical-align: middle;

		&.outline {
			font-family: 'Material Icons Outline';
		}
	}

	.custom {
		display: contents;

		svg {
			position: relative;
			top: 2px;
			left: 2px;
			width: calc(100% - 4px);
			height: calc(100% - 4px);
			color: inherit;
			fill: currentColor;
		}
	}
}
</style>
