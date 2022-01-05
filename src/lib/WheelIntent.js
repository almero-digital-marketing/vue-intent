export default {
    mounted(el, binding) {
        el.state = {
            timer: null,
            onWheel() {
                clearTimeout(el.state.timer)
                el.classList.add('wheel-intent')
                if (binding.value) {
                    binding.value(el, true)
                }
                el.state.timer = setTimeout(() => {
                    el.classList.remove('wheel-intent')
                    if (binding.value) {
                        binding.value(el, false)
                    }
                }, el.dataset.intent || 1000)
            },
        }
        
        el.addEventListener('wheel', el.state.onWheel, { passive: true })
    },
    unmounted(el) {
        if (el.state) {
            el.removeEventListener('wheel', el.state.onWheel)

            clearTimeout(el.state.timer)
            delete el.state
        }
    }
}