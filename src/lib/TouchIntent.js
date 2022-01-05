export default {
    mounted(el, binding) {
        el.state = {
            timer: null,
            onTouchStart() {
                clearTimeout(el.state.timer)
                el.classList.add('touch-intent')
                if (binding.value) {
                    binding.value(el, true)
                }
            },
            onTouchEnd() {
                clearTimeout(el.state.timer)
                el.state.timer = setTimeout(() => {
                    el.classList.remove('touch-intent')
                    if (binding.value) {
                        binding.value(el, false)
                    }
                }, el.dataset.intent || 1000)
            }
        }
        
        el.addEventListener('touchstart', el.state.onTouchStart)
        el.addEventListener('touchend', el.state.onTouchEnd)
    },
    unmounted(el) {
        if (el.state) {
            el.removeEventListener('touchstart', el.state.onTouchStart)
            el.removeEventListener('touchend', el.state.onTouchEnd)

            clearTimeout(el.state.timer)
            delete el.state
        }
    }
}