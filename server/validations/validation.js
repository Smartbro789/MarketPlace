import {body} from "express-validator";

export const loginValidator =[
    body('email', 'Неправильний формат пошти').isEmail(),
    body('password', 'Мінімальна довжина паролю - 8 символів').isLength({min: 8}),
];

export const registrationValidator =[
    body('fullname', 'Вкажіть повне ім`я').isLength({min:5}),
    body('email', 'Неправильний формат пошти').isEmail(),
    body('password', 'Мінімальна довжина паролю - 8 символів').isLength({min: 8}),
];

