export default {
    mounted(el, binding) {
        el.state = {
            timer: null,
            onPressStart() {
                clearTimeout(el.state.timer)
                el.classList.add('press-intent')
                if (binding.value) {
                    binding.value(el, true)
                }
            },
            onPressEnd() {
                clearTimeout(el.state.timer)
                el.state.timer = setTimeout(() => {
                    el.classList.remove('press-intent')
                    if (binding.value) {
                        binding.value(el, false)
                    }
                }, el.dataset.intent || 1000)
            }
        }
        
        el.addEventListener('mousedown', el.state.onPressStart)
        el.addEventListener('mouseup', el.state.onPressEnd)
        el.addEventListener('touchstart', el.state.onPressStart)
        el.addEventListener('touchend', el.state.onPressEnd)
    },
    unmounted(el) {
        if (el.state) {
            el.removeEventListener('mousedown', el.state.onPressStart)
            el.removeEventListener('mouseup', el.state.onPressEnd)
            el.removeEventListener('touchstart', el.state.onPressStart)
            el.removeEventListener('touchend', el.state.onPressEnd)

            clearTimeout(el.state.timer)
            delete el.state
        }
    }
}