import joi from 'joi'

export const transactionSchema = joi.object({
    value: joi.number().positive().required().messages({
        'any.required': 'O campo "email" é obrigatório.',
        'string.empty': 'O campo "email" não pode estar vazio.',
        'string.email': 'O campo "email" deve ter um formato válido.',
    }),
    description: joi.string().required().messages({
        'any.required': 'O campo "description" é obrigatório.',
        'string.empty': 'O campo "description" não pode estar vazio.',
      }),
    type: joi.string().valid('entrada', 'saida').required().messages({
        'any.required': 'O campo "type" é obrigatório.',
        'string.empty': 'O campo "type" não pode estar vazio.',
        'any.only': 'O campo "type" deve ser "entrada" ou "saida".',
    }),
})

export const transactionUpdateSchema = joi.object({
    value: joi.number().positive().required().messages({
        'any.required': 'O campo "email" é obrigatório.',
        'string.empty': 'O campo "email" não pode estar vazio.',
        'string.email': 'O campo "email" deve ter um formato válido.',
    }),
    description: joi.string().required().messages({
        'any.required': 'O campo "description" é obrigatório.',
        'string.empty': 'O campo "description" não pode estar vazio.',
      })

})