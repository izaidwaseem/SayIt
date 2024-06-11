import tensorflow as tf
import tensorflowjs as tfjs

# Load the Keras model
model = tf.keras.models.load_model('CNN.h5')

# Convert the model to TensorFlow.js format
tfjs.converters.save_keras_model(model, './')
