
function path(root: string, sublink: string) {
    return `${root}${sublink}`;
}

const ROOTS_AUTH = '/auth';
const ROOTS_DASHBOARD = '/dashboard';

export const PATH_AUTH = {
    root: ROOTS_AUTH,
    login: path(ROOTS_AUTH, '/login'),
    register: path(ROOTS_AUTH, '/register'),
    // loginUnprotected: path(ROOTS_AUTH, '/login-unprotected'),
    // registerUnprotected: path(ROOTS_AUTH, '/register-unprotected'),
    verify: path(ROOTS_AUTH, '/verify'),
    resetPassword: path(ROOTS_AUTH, '/reset-password'),
    newPassword: path(ROOTS_AUTH, '/new-password'),
};

export const PATH_DASHBOARD = {
    root: ROOTS_DASHBOARD,
    general: {
      app: path(ROOTS_DASHBOARD, '/app'),
    },
    components: {
        root: path(ROOTS_DASHBOARD, '/components'),
        form: path(ROOTS_DASHBOARD, '/components/form'),
        datatable: path(ROOTS_DASHBOARD, '/components/datatable'),
    },
    profile: path(ROOTS_DASHBOARD, '/profile'),
    organization: {
        index: path(ROOTS_DASHBOARD, '/organization'),
        general: path(ROOTS_DASHBOARD, '/organization/general'),
        users: path(ROOTS_DASHBOARD, '/organization/users'),
        biling: {
            index: path(ROOTS_DASHBOARD, '/organization/biling'),
            details: (id: string) => path(ROOTS_DASHBOARD, `/organization/billing/${id}`),
        },
        webhook: {
            index: path(ROOTS_DASHBOARD, '/organization/webhooks'),
            details: (id: string) => path(ROOTS_DASHBOARD, `/organization/webhooks/${id}`),
        },
        switch: path(ROOTS_DASHBOARD, '/organization/switch'),
    },
    framework: {
        index: path(ROOTS_DASHBOARD, '/framework'),
    }
};

export const PATH_DEVICE = {
    root: ROOTS_DASHBOARD,
    device: {
        device: path(ROOTS_DASHBOARD, '/device'),
        create: path(ROOTS_DASHBOARD, '/device/create'),
        view: (id: string) => path(ROOTS_DASHBOARD, `/device/${id}`),
        edit: (id: string) => path(ROOTS_DASHBOARD, `/device/${id}/edit`),
        deviceExportHtml: path(ROOTS_DASHBOARD, '/device/export/html'),
        framework: path(ROOTS_DASHBOARD, '/frameworks'),
    },
};