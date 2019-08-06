export const checkToken = async (admin, token) => {
  let result;

  try {
    result = await admin.verifyIdToken(token);
  } catch (err) {
    return false;
  }
  return true;
};
