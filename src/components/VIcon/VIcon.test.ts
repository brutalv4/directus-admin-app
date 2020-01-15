import { mount, createLocalVue } from '@vue/test-utils';
import VueCompositionAPI from '@vue/composition-api';

const localVue = createLocalVue();
localVue.use(VueCompositionAPI);

import VIcon from './VIcon.vue';

describe('Icon', () => {
	it('Renders the correct markup for a Material Icon', () => {
		const component = mount(VIcon, {
			localVue,
			propsData: {
				color: '--blue-grey',
				name: 'person'
			}
		});

		expect(component.html()).toContain('<span class="VIcon"><i class="">person</i></span>');
	});

	it('Renders custom icons as inline <svg>', () => {
		const component = mount(VIcon, {
			localVue,
			propsData: {
				color: '--blue-grey',
				name: 'box'
			}
		});

		expect(component.contains('svg')).toBe(true);
	});

	describe('Sizes', () => {
		const component = mount(VIcon, {
			localVue,
			propsData: {
				color: '--blue-grey',
				name: 'person'
			}
		});

		test('Extra Small', () => {
			component.setProps({ xSmall: true, small: false, large: false, xLarge: false });
			component.vm.$nextTick(() => expect(component.classes()).toContain('x-small'));
		});

		test('Small', () => {
			component.setProps({ xSmall: false, small: true, large: false, xLarge: false });
			component.vm.$nextTick(() => expect(component.classes()).toContain('small'));
		});

		test('Large', () => {
			component.setProps({ xSmall: false, small: false, large: true, xLarge: false });
			component.vm.$nextTick(() => expect(component.classes()).toContain('large'));
		});

		test('Extra Large', () => {
			component.setProps({ xSmall: false, small: false, large: false, xLarge: true });
			component.vm.$nextTick(() => expect(component.classes()).toContain('x-large'));
		});

		it('Uses the smallest size prop provided', () => {
			component.setProps({ xSmall: false, small: true, large: false, xLarge: true });
			component.vm.$nextTick(() => expect(component.classes()).toContain('small'));
		});
	});
});
