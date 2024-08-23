import { AxiosResponse } from "axios";
import axios from "@/_global/utils/axios";

const apiHostPrefix = process.env.API_HOST_PREFIX;

const ENDPOINT = {
    BUSINESS_USER_MANAGE: `${apiHostPrefix}/business-user/manage`,
    BUSINESS_USER_SWITCH: `${apiHostPrefix}/business-user/switch`,
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