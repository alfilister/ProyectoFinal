const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
	sequelize.define(
		"product",
		{
			name: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			image: {
				type: DataTypes.TEXT,
				// validate: {
				//   is: /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i,

				//   is: /(https?:\/\/.*\.(?:png|jpg|jpeg|webp))/i,
				// },
			},
			aux_images: {
				type: DataTypes.ARRAY(DataTypes.TEXT),
			},
			description: {
				type: DataTypes.TEXT,
				allowNull: false,
			},
			discount: {
				type: DataTypes.INTEGER,
			},
			stock: {
				type: DataTypes.INTEGER,
				defaultValue: 5,
			},
			price: {
				type: DataTypes.FLOAT,
				allowNull: false,
			},
			featured: {
				type: DataTypes.BOOLEAN,
				defaultValue: false,
			},
			rating: {
				type: DataTypes.FLOAT,
				validate: {
					min: 0,
					max: 5,
				},
			},
		},
		{ timestamps: false, createdAt: false, updatedAt: false }
	);
};
