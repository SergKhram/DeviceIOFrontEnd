class HttpClient {
    async getHosts() {
        return fetch('/hosts')
            .then(response => response.json());
    }

    async deleteHost(id) {
        console.log('Deleting the host')
        return await fetch(`/host/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
    }

    async getDevices(id, isSaved) {
        return await fetch('/devices?' + ((id !== '') ? 'hostId=' + id + '&' : '') + 'isSaved=' + String(isSaved), {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
    }

    async deleteDevice(id) {
        fetch(`/device/` + id, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
    }

    async postDevices(body) {
        await fetch('/devices', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: body
        })
    }

    async updateHostState(id) {
        await fetch(`/host/${id}/updateState?deleteDevices=true`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
    }

    async connectHost(id) {
        console.log('Connecting to the host')
        fetch('/host/' + id + '/connect', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
    }

    async updateHost(id, item) {
        return await fetch('/host/' + id, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item),
        })
    }

    async addHost(item) {
        return await fetch('/host', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item),
        })
    }

    async getHost(id) {
        return await fetch(`/host/` + id, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
    }
}
export default HttpClient