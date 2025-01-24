import { setUncaughtExceptionCaptureCallback } from "node:process"

const HTTP_CODES = {

    INFO: {
        CONTINUE: 100,
        SWITCHING_PROTOCOLS: 101,
        PROCESSING: 102,
        EARLY_HINTS: 103
    },
    SUCCESS: {
        OK: 200,
        CREATED: 201,
        ACCEPTED: 202
    },
    CLIENT_ERROR: {
        NOT_FOUND: 404,
        BAD_REQUEST: 400,
        IM_A_TEAPOT: 418
    },
    SERVER_ERROR:{
        INTERNAL_SERVER_ERROR: 500,        
    }
}

export default HTTP_CODES;