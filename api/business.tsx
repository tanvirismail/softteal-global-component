import { AxiosResponse } from "axios";
import axios from "@/_global/utils/axios";

const apiHost = process.env.AUTHSERVER_API_HOST;

const ENDPOINT = {
    BUSINESS_USER_MANAGE: `${apiHost}/api/business-user/manage`,
    BUSINESS_USER_SWITCH: `${apiHost}/api/business-user/switch`,
}

export function getManageBusinesses() {
    return axios
    .get(`${ENDPOINT.BUSINESS_USER_MANAGE}`)
    .then((d: AxiosResponse) => d.data)  // AxiosResponse
}

export function switchBusiness(id:any) {
    return axios
    .post(`${ENDPOINT.BUSINESS_USER_SWITCH}`, {id:id})
    .then((d: AxiosResponse) => d.data)  // AxiosResponse
}