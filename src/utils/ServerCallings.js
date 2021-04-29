//
import { NodeFetchHelper } from "./NodeFetchHelper";

const api_endpoint = "https://eign-backend.herokuapp.com/"
const login_endpoint = api_endpoint + "user/login/"
const registration_endpoint = api_endpoint + "user/registration/"
const property_list_endpoint = api_endpoint + 'property/list/'
const single_property_endpoint = api_endpoint + "property/get-property/"
const post_property_endpoint = api_endpoint + "property/post-property/"
const post_schedule_tour = api_endpoint + "property/tour-submit/"

const post_newst_date = api_endpoint + "property/date/"
const post_lowtohigh = api_endpoint + "property/lh/"
const post_hightolow = api_endpoint + "property/hl/"
const edit_registration = api_endpoint + "user/info/"
const send_edit_registration = api_endpoint + "user/edit/"
const send_favourits = api_endpoint + "property/fav/"
const admin_favourits = api_endpoint + "user/fav/"
const send_recent_viewed = api_endpoint + "property/get-property/"
const admin_recent_viewed = api_endpoint + "user/recent/"
const send_msg = api_endpoint + "property/message/"
const receive_msg = api_endpoint + "property/get_message/"
const chat_rooms = api_endpoint + "property/get_message_admin/"

//
export class ServerCallings {
    static revive() {
        NodeFetchHelper.get(api_endpoint, null, null, (a, b) => {
            console.log("Revived")
        })
    }

    static chatRooms(userId, cb) {
        NodeFetchHelper.get(chat_rooms + userId + "/", null, null, (status, data) => {
            if (status >= 400) {
                cb(null)
            } else {
                cb(data)
            }
        })
    }

    static receiveMessage(userRoom, cb) {
        NodeFetchHelper.get(receive_msg + userRoom + "/", null, null, (status, data) => {
            if (status >= 400) {
                cb(null)
            } else {
                cb(data)
            }
        })
    }

    static sendMessages(body, callback) {
        NodeFetchHelper.post(send_msg , null, null, body, (status, data) => {
            if (status >= 400) {
                callback(null)
            } else {
                // console.log(data)
                callback(data)
            }
        })
    }

    static adminrecentviewed(userId, cb) {
        NodeFetchHelper.get(admin_recent_viewed + userId + "/", null, null, (status, data) => {
            if (status >= 400) {
                cb(null)
            } else {
                cb(data)
            }
        })
    }

    static sendrecentviewed(body, propertyId, callback) {
        NodeFetchHelper.post(send_recent_viewed + propertyId + "/", null, null, body, (status, data) => {
            if (status >= 400) {
                callback(null)
            } else {
                // console.log(data)
                callback(data)
            }
        })
    }

    static adminfavourits(userId, cb) {
        NodeFetchHelper.get(admin_favourits + userId + "/", null, null, (status, data) => {
            if (status >= 400) {
                cb(null)
            } else {
                cb(data)
            }
        })
    }


    static sendfavourits(body, userId, propertyId, callback) {
        NodeFetchHelper.post(send_favourits + userId + "/" + propertyId + "/", null, null, body, (status, data) => {
            if (status >= 400) {
                callback(data)
            } else {
                console.log(data)
                callback(data)
            }
        })
    }

    static editProfile(id, cb) {
        NodeFetchHelper.get(edit_registration + id + "/", null, null, (status, data) => {
            if (status >= 400) {
                cb(null)
            } else {
                cb(data)
            }
        })
    }

    static sendEditProfileData(body, id, callback) {
        NodeFetchHelper.post(send_edit_registration + id + "/", null, null, body, (status, data) => {
            if (status >= 400) {
                callback(data)
            } else {
                console.log(data)
                callback(data)
            }
        })
    }

    static newst(body, callback) {
        NodeFetchHelper.post(post_newst_date, null, null, body, (status, data) => {
            if (status >= 400) {
                callback(null)
            } else {
                callback(data)
            }
        })
    }

    static lowtohigh(body, callback) {
        NodeFetchHelper.post(post_lowtohigh, null, null, body, (status, data) => {
            if (status >= 400) {
                callback(null)
            } else {
                callback(data)
            }
        })
    }

    static hightolow(body, callback) {
        NodeFetchHelper.post(post_hightolow, null, null, body, (status, data) => {
            if (status >= 400) {
                callback(null)
            } else {
                callback(data)
            }
        })
    }



    static list(body, callback) {
        // console.log("Body: " + JSON.stringify(body))

        NodeFetchHelper.post(property_list_endpoint, null, null, body, (status, data) => {
            if (status >= 400) {
                callback(null)
            } else {
                callback(data)
            }
        })
    }

    static login(email, password, callback) {
        NodeFetchHelper.post(login_endpoint, null, null, {
            email,
            password,
        }, (status, data) => {
            if (status >= 400) {
                callback(null)
            } else {
                console.log(data)
                callback(data)
            }
        })
    }

    static register(body, callback) {
        console.log("Body: " + JSON.stringify(body))

        NodeFetchHelper.post(registration_endpoint, null, null, body, (status, data) => {
            if (status >= 400) {
                callback(null)
            } else {
                callback(data)
            }
        })
    }

    static getOneProperty(id, cb) {
        NodeFetchHelper.post(single_property_endpoint + id + "/", null, null, null, (status, data) => {
            if (status >= 400) {
                cb(null)
            } else {
                cb(data)
            }
        })
    }

    static getProperties(body, cb) {
        NodeFetchHelper.post(property_list_endpoint, null, null, body, (status, data) => {
            // console.log(data)
            if (status >= 400) {
                cb(null)
            } else {
                cb(data)
            }
        })
    }

    static postProperty(body, cb) {
        NodeFetchHelper.post(post_property_endpoint, null, null, body, (status, data) => {
            if (status >= 400) {
                cb(null)
            } else {
                cb(data)
            }
        })

        // NodeFetchHelper.upload(post_property_endpoint, null, body, (status, data) => {
        //     if (status >= 400) {
        //         cb(null)
        //     } else {
        //         cb(data)
        //     }
        // })
    }
    static postTour(body, cb) {
        NodeFetchHelper.post(post_schedule_tour, null, null, body, (status, data) => {
            if (status >= 400) {
                cb(null)
            } else {
                cb(data)
            }
        })

        // NodeFetchHelper.upload(post_property_endpoint, null, body, (status, data) => {
        //     if (status >= 400) {
        //         cb(null)
        //     } else {
        //         cb(data)
        //     }
        // })
    }
}
