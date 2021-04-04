class HttpService {
    constructor() {
        const token = localStorage.getItem('token')
        this.authToken = token === null ? null : 'Bearer ' + token

        this.baseUrl = 'http://127.0.0.1:9998'
    }

    async refreshToken(response, rdata, callback) {
        // console.log(response)

        if (response.status === 403) {
            let rtoken = localStorage.getItem('rtoken')

            if (rtoken === null || rtoken === '') {
                this.logout()
                return
            }

            localStorage.setItem('rtoken', '')

            let refreshResponse = await fetch('/users/refresh', {
                method: 'PUT',
                body: JSON.stringify({ 'token': rtoken })
            })
            let data = await refreshResponse.json()

            localStorage.setItem('rtoken', data.refresh_token)
            localStorage.setItem('token', data.token)
            this.authToken = data.token

            let cfg = response.config
            let reResponse = await fetch(cfg.url, {
                method: cfg.method,
                headers: {
                    'Authorization': 'Bearer ' + data.token,
                    'Content-Type': 'application/json'
                },
                body: rdata === null ? null : JSON.stringify(rdata)
            })

            if (response.ok) {
                if (callback !== null && callback !== undefined) {
                    let jsonData = await reResponse.json()
                    callback(jsonData)
                }
            } else {
                this.logout()
            }
        }
        if (callback !== null) {
            let json = await response.json()
            callback(json)
        }
    }

    async httpGet(url, callback) {
        let response = await fetch(this.baseUrl + url, {
            headers: {
                Authorization: this.getToken(),
                'Content-Type': 'application/json'
            }
        })
        await this.refreshToken(response, null, callback)
    }

    async httpPost(url, data, callback) {
        let response = await fetch(this.baseUrl + url, {
            method: 'POST',
            headers: {
                Authorization: this.getToken(),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        await this.refreshToken(response, data, callback)
    }

    async httpPut(url, data, callback) {
        let response = await fetch(this.baseUrl + url, {
            method: 'PUT',
            headers: {
                Authorization: this.getToken(),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        await this.refreshToken(response, data, callback)
    }

    async httpDelete(url, callback) {
        let response = await fetch(this.baseUrl + url, {
            method: 'DELETE',
            headers: {
                Authorization: this.getToken(),
                'Content-Type': 'application/json'
            }
        })
        await this.refreshToken(response, null, callback)
    }

    logout() {
        let storage = window.localStorage;
        storage.removeItem("token");
        storage.removeItem("rtoken");
        this.authToken = null
    }

    getToken() {
        if (this.authToken == null || this.authToken === '') {
            this.authToken = 'Bearer ' + localStorage.getItem('token')
        }

        return this.authToken
    }
}

export default new HttpService()