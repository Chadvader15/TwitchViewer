new Vue({
    el: '#app',
    data: {
        streams: [],
        displayStreams: [],
    },

    created() {
        this.getStreams();
    },

    computed: {

    },

    methods: {
        getStreams() {
            let streamers = ["freecodecamp", "hellberg431", "gedubbelve", "ninja", "imaqtpie"];
            streamers.forEach((stream) => {
                axios.get(this.createUrl('streams', stream))
                    .then(({ data }) => {
                        let streamObj = { channel: stream };

                        data.stream ? streamObj.status = 'Online' : streamObj.status = 'Offline';

                        streamObj.data = data.stream;

                        axios.get(this.createUrl('channels', stream))
                            .then(({ data }) => {
                                streamObj.streamInfo = data;
                                this.streams.push(streamObj);
                        });
                    });

            });

            this.displayStreams = this.streams;
        },

        displayStreamers(status) {
            if(status === "Online") {
                this.displayStreams = this.streams.filter(stream => stream.status === "Online");
            }
            if(status === "Offline") {
                this.displayStreams = this.streams.filter(stream => stream.status === "Offline");
            }
            if(status === "All") {
                this.displayStreams = this.streams;
            }
        },

        createUrl(type, name) {
            return `https://wind-bow.glitch.me/twitch-api/${type}/${name}`;
        },

        openStream(stream) {
            window.open(stream);
        },
    }

});
