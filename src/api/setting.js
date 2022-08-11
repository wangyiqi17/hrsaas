import request from "@/utils/request"

export function getCompanyInfoApi(companyId) {
    return request ({
        url: `/company/${companyId}`,

    })
}