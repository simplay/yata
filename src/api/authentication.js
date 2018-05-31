import api from "./base"

// @param credentials [Object] E.g. { email: "foo@bar.org", password: "foobar" }
export function performAuthentication(credentials) {
    return api.post('authenticate/', credentials);
}
