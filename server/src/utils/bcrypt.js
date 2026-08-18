import bcrypt from "bcrypt";

const SALT_ROUNDS = 12;

//Hash Password
export const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(SALT_ROUNDS);

  const hashedPassword = await bcrypt.hash(
    password,
    salt
  );

  return hashedPassword;
};


//Compare  password
export const  comparePassword = async(password, hashedPassword) =>{
    return await bcrypt.compare(
        password,
        hashedPassword
    )
}