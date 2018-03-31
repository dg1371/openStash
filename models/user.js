/**
 * Created by dan_g on 5/12/2017.
 */
module.exports = function (sequelize, DataTypes) {
    var User = sequelize.define("user", {
        id: {type: DataTypes.UUID, allowNull: false, defaultValue: DataTypes.UUIDV1, unique: true, primaryKey: true, description: "ID"},
        companyId: {type: DataTypes.UUID, description: "Company ID"},
        userID: {type: DataTypes.STRING, allowNull: false, unique: true, description: "User ID"},
        employeeID: {type: DataTypes.STRING, allowNull: true, description: "Employee ID"},
        firstName: {type: DataTypes.STRING, allowNull: false, description: "First Name"},
        lastName: {type: DataTypes.STRING, allowNull: false, description: "Last Name"},
        password: {type: DataTypes.STRING, allowNull: false, description: "Password"},
        email: {type: DataTypes.STRING, allowNull: true, description: "Email"},
        apiKey: {type: DataTypes.TEXT, description: "API Key"},
        active: {type: DataTypes.BOOLEAN, allowNull: true, defaultValue: true, description: "Active"},
        updateUserId: {type: DataTypes.UUID, description: "Update User ID"},
        createUserId: {type: DataTypes.UUID, description: "Create User ID"},
        createdAt: {type: DataTypes.DATE, description: "Created Date"},
        updatedAt: {type: DataTypes.DATE, description: "Updated Date"}
    }, {
        description: "User",
        defaultScope: {
            attributes: {exclude: ["password", "apiKey"]}
        },
        scopes: {
            APIScope: {
                attributes: ["apiKey"]
            }
        },
        freezeTableName: true,
   //     classMethods: {
   //         associate: function (models) {
   //             models.user.belongsTo(models.company);

   //         }
    //    }
    });

    User.associate = function(models) {
        models.user.belongsTo(models.company);
    };

    return User;
};