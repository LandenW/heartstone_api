/**
 * Hero.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
      heroFirstName: {
        type: 'string',
        unique: true,
        required: true,
        alpha: true
      },

      heroLastName: {
        type: 'string',
        alpha: true
      },

      heroClass: {
        type: 'string',
        required: true
      },

      isPremium: {
        type: 'boolean',
        required: true
      },

      heroColor: {
        type: 'string',
        required: true,
        hexColor: true
      },

      image: {
        type: 'string',
        url: true
      }
    }
};
