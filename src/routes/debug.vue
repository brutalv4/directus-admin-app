<template>
	<div class="debug">
		<VIcon name="box" color="--purple" x-small />
		<VIcon name="box" color="--blue" small />
		<VIcon name="box" color="--green" />
		<VIcon name="box" color="--yellow" large />
		<VIcon name="box" color="--red" x-large />
	</div>
</template>

<script>
import VIcon from '@/components/VIcon/';
export default {
	components: {
		VIcon
	}
};
</script>

<style scoped>
.debug {
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 200px 0;
}
</style>
