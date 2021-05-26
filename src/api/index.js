import axios from "axios";
import env from '../env/env'

const base_url_endpoint = 'http://localhost:9999/api/'
const api_line_noti = "https://notify-api.line.me/api/notify"

const REQ_HEADER_BASIC = {
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    }
}

const REQ_HEADER_BEARER = {
    headers: {
        "content-type": "application/x-www-form-urlencoded",
        Authorization:
            `Bearer ` + env.line_token,
    },
};

// Line api
export const SendLineNoti = (data) => {
    const endpoint = `${api_line_noti}`;
    return axios.post(endpoint, data, REQ_HEADER_BEARER);
};


export const GetAllMachine = () => {
    const endpoint = `${base_url_endpoint}`;
    return axios.get(endpoint, REQ_HEADER_BASIC);
};

export const CreateMachine = (payload) => {
    const endpoint = `${base_url_endpoint}create-machine`;
    return axios.post(endpoint, payload, REQ_HEADER_BASIC);
};

export const DeleteMachine = (id, payload) => {
    const endpoint = `${base_url_endpoint}delete-machine/${id}`;
    return axios.delete(endpoint, payload, REQ_HEADER_BASIC)
};

export const UpdateMachine = (id, payload) => {
    const endpoint = `${base_url_endpoint}update-machine/${id}`;
    return axios.put(endpoint, payload, REQ_HEADER_BASIC);
};

export const EditMachine = (id, payload) => {
    const endpoint = `${base_url_endpoint}edit-machine/${id}`;
    return axios.post(endpoint, payload, REQ_HEADER_BASIC);
};