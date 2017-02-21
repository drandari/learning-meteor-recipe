Recipes = new Mongo.Collection('recipes');

Ingredient = new SimpleSchema({
    name: {
        type: String
    },
    amoun: {
        type: String
    }
})

RecipeSchema = new SimpleSchema({
    name: {
        type: String,
        label: "Name"
    },
    desc: {
        type: String,
        label: "Description"

    },
    ingredients: {
        type: [Ingredient]
    },
    inMenu: {
        type: Boolean,
        defaultValue: false,
        optional: true,
        autoform: {
            type: "hidden"
        }
    },
    author: {
        type: String,
        label: "Author",
        autoValue: function() {
            return this.userId
        },
        autoform: {
            type: 'hidden'
        }
    },
    createdAt: {
        type: Date,
        label: "Created At",
        autoValue: function() {
            return new Date()
        },
        autoform: {
            type: 'hidden'
        }        
    }
});

Recipes.attachSchema( RecipeSchema );

Meteor.methods({
    'Recipes.Insert'(doc){
        
        if(! this.userId){
            throw new Meteor.Error('not-authorized');
        }

        Recipes.insert( doc, function(err, docId) {console.log("DocId: ", docId);});
    },
});