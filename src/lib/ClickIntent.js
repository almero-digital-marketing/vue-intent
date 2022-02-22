export default {
    mounted(el, binding) {
        el.state = {
            timer: null,
            onClick() {
                clearTimeout(el.state.timer)
                el.classList.add('click-intent')
                if (binding.value) {
                    binding.value(el, true)
                }
                clearTimeout(el.state.timer)
                el.state.timer = setTimeout(() => {
                    el.classList.remove('click-intent')
                    if (binding.value) {
                        binding.value(el, false)
                    }
                }, el.dataset.intent || 300)
            },
        }
        
        el.addEventListener('click', el.state.onClick)
    },
    unmounted(el) {
        if (el.state) {
            el.removeEventListener('click', el.state.onMouseDown)

            clearTimeout(el.state.timer)
            delete el.state
        }
    }
}