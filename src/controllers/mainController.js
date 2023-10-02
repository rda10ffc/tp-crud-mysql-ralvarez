/* BASE DE DATOS */

const db = require('../database/models')

//const { json } = require('express');
const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
/* //retorno de forma renderizada a products
		return res.render('index',{
			visited : products.filter(products => products.category === 'visited'), //filtro productos con la categoria visitado 
			sale :  products.filter(products => products.category === 'in-sale'), // filtro productos con la categoria ofertas
			toThousand
		}) */
/* la seiguente parte de codigo es para mostrar en el index solo la parte de productos visitados */
const controller = {
	index: (req, res) => {
		const visited = db.Product.findAll({
			where: {
				categoryId: 1,
			},
		});
		const sale = db.Product.findAll({
			where: {
				categoryId: 2,
			},
		});
		Promise.all([visited, sale])
			.then(([visited, sale]) => {
				return res.render("index", {
					visited,
					sale,
					toThousand,
				});
			})
			.catch((error) => console.log(error));
	},
	search: (req, res) => {
		const keywords = req.query.keywords;

		db.Product.findOne({
			where: {
				name: {
					[db.Sequelize.Op.like]: `%${keywords}%`,
				},
			},
		})
			.then((result) => {
				if (result) {
					return res.render("results", {
						results: [result],
						toThousand,
						keywords,
					});
				}
			})
			.catch((error) => console.log(error));
	},
};

module.exports = controller;
