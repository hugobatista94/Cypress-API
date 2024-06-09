/// <reference types="cypress"/>

describe('Alterar Disposivitos', () =>{
    it(' Alterar um dispositivo', () => {
        const body_register = require('../fixtures/cadastrar_device_sucesso.json')
        const body_update = require('../fixtures/update_device_sucesso.json')

        cy.request({
            method: 'POST',
            url:'/objects',
            failOnStatusCode: false,
            body: body_register
            
        }).as('postDeviceResult')

        //pegando o result do cadastro para pegar o id
            cy.get('@postDeviceResult').then((response_post) => {

                expect(response_post.status).equal(200)
                expect(response_post.body.name).equal(body_register.name)

                //fazer o UPDATE
                cy.request({
                    method: 'PUT',
                    url:`/objects/${response_post.body.id}`,
                    failOnStatusCode: false,
                    body:body_update
                    }).as('putDeviceResult')

                //validações do UPDATE
                cy.get('@putDeviceResult').then((response_put) =>{

                    expect(response_put.status).equal(200)
                    expect(response_put.body.name).equal(body_update.name)    
        
                })

            })

        })

    })

