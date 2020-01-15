import { withKnobs, text, boolean } from "@storybook/addon-knobs";
import VIcon from "./VIcon.vue";

export default { title: "v-icon", decorators: [withKnobs] };

export const interactive = () => ({
	components: { VIcon },
	template: `<v-icon :name="name" :color="color" />`,
	props: {
		name: {
			default: text("Icon Name", "person")
		},
		color: {
			default: text("Icon Color", "--blue-grey-500")
		}
	}
});
