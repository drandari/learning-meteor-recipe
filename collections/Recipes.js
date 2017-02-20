import { check } from 'meteor/check';

Recipes = new Meteor.Collection('recipes');

RecipeSchema = new SimpleSchema({
    name: {
        type: String,
        label: "Name"
    },
    desc: {
        type: String,
        label: "Description"

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
        RecipeSchema.clean(doc);        
        check(doc, Recipes.simpleSchema());

        if(! this.userId){
            throw new Meteor.Error('not-authorized');
        }

        Recipes.insert( doc, function(err, docId) {console.log("DocId: ", docId);});
    },
});