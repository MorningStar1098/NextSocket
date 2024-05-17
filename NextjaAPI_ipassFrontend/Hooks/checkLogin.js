export function checkLogin(token, base64Email) {
    try {
        if (token !== undefined && token?.length > 3 && base64Email !== undefined && base64Email.length > 3) {
            return atob(base64Email)
        }
        else {
            return false;
        }
    }
    catch (e) {
        return false;
    }
}