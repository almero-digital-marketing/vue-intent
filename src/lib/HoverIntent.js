export default {
    mounted(el, binding) {
        el.state = {
            timer: null,
            onMouseOver() {
                if (!el.state.timer) {
                    el.state.timer = setTimeout(() => {
                        el.classList.add('hover-intent')
                        if (binding.value) {
                            binding.value(el, true)
                        }
                    }, el.dataset.intent || 200)
                }
            },
            onMouseLeave() {
                el.classList.remove('hover-intent')
                if (binding.value) {
                    binding.value(el, false)
                }
                clearTimeout(el.state.timer)
                el.state.timer = null
            }
        }
        
        el.addEventListener('mouseover', el.state.onMouseOver)
        el.addEventListener('mouseleave', el.state.onMouseLeave)
    },
    unmounted(el) {
        if (el.state) {
            el.removeEventListener('mouseover', el.state.onMouseOver)
            el.removeEventListener('mouseleave', el.state.onMouseLeave)

            clearTimeout(el.state.timer)
            delete el.state
        }
    }
}