export default {
    data: function data() {
        return {
            viewportOffsetState: {
                above: null,
                below: null,
                in: null,
            },
        };
    },
    computed: {
        isInViewport() {
            return this.viewportOffsetState.in;
        },
    },
    methods: {
        getRoot() {
            switch (typeof this.viewportCheckerRoot) {
                case 'function':
                    return this.viewportCheckerRoot();
                case 'string':
                    return document.querySelector(this.viewportCheckerRoot);
                case 'object':
                    return this.viewportCheckerRoot;
                default:
                    return null;
            }
        },
        viewportCheckerInit() {
            if (!this.$el) {
                return;
            }

            if (typeof IntersectionObserver === 'undefined') {
                this.viewportOffsetState.in = true;
                return;
            }

            if (this.viewportObserver) {
                this.viewportCheckerDestroy();
            }

            this.viewportObserver = new IntersectionObserver(this.viewportCheckerUpdate, {
                root: this.getRoot(),
                rootMargin: this.viewportCheckerMargin,
                threshold: this.viewportCheckerThreshold,
            });
            this.viewportObserver.observe(this.$el);
        },
        viewportCheckerDestroy() {
            if (this.viewportObserver) {
                if (typeof this.viewportObserver.disconnect === 'function') {
                    this.viewportObserver.disconnect();
                }
                delete this.viewportObserver;
            }
        },
        viewportCheckerUpdate(entries) {
            const entry = entries[0];

            const target = entry.boundingClientRect;
            const root = entry.rootBounds;

            if (!target || !root) {
                return;
            }

            const inViewport = target.top <= root.bottom && target.bottom > root.top;
            this.viewportOffsetState.in = inViewport;
            this.viewportOffsetState.above = inViewport ? false : target.top < root.top;
            this.viewportOffsetState.below = inViewport ? false : target.bottom > root.bottom + 1;
        },
    },
    destroyed() {
        return this.viewportCheckerDestroy();
    },
    mounted() {
        return this.$nextTick(this.viewportCheckerInit());
    },
    props: {
        viewportCheckerMargin: {
            type: [Number, String],
            default: '0px 0px -1px 0px',
        },
        viewportCheckerRoot: {
            type: [String, Function, Object],
            default: null,
        },
        viewportCheckerThreshold: {
            type: [Number, Array],
            default: () => [0, 1],
        },
    },
};
