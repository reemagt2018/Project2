import os
import pandas as pd
import numpy as np
import sqlalchemy
from flask import Flask, render_template, request
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine
from flask import Flask, jsonify, render_template
from flask_sqlalchemy import SQLAlchemy
app = Flask(__name__)
app.debug = True



#################################################
# Database Setup
#################################################

#app.config[“SQLALCHEMY_DATABASE_URI”] = os.environ.get(‘DATABASE_URL’, ‘’) or “sqlite:///db/ranking_data.sqlite”
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///db/karemDB.sqlite"
db = SQLAlchemy(app)

# reflect an existing database into a new model
Base = automap_base()
# # reflect the tables
Base.prepare(db.engine, reflect=True)

# # Save references to each table
Cities_Metadata = Base.classes.city



@app.route('/', methods=['GET'])
def dropdown():
   city = ['Washington', 'Chicago', 'Austin', 'San Jose', 'Dallas', 'Houston', 'New York', 'Minneapolis', 'Boston', 'Atlanta', 'San Diego', 'Raleigh', 'Philadelphia', 'Sacramento', 'Nashville', 'Los Angeles', 'San Francisco', 'Phoenix', 'Charlotte'
]
   return render_template('index.html', city=city)



# @app.route("/")
# def index():
#     """Return the homepage."""
#     return render_template("index.html")


# @app.route("/names")
# def names():
# #     """Return a list of all cities."""
#
# #     # Use Pandas to perform the sql query
#     stmt = db.session.query(Cities_Metadata).statement
#     df = pd.read_sql_query(stmt, db.session.bind)
#
# #     # Return a list of the column city_names(all cities)
#     return jsonify(list(df.columns)[1:])


# @app.route("/metadata/<city>")
# def citymetadata(city):
#     """Return the MetaData"""
#     sel = [
#         Cities_Metadata.city,
#         Cities_Metadata.STATE,
#         Cities_Metadata.BFRankOverall,
#         Cities_Metadata.EducationalOverallRank,
#         Cities_Metadata.MobileOverallscore,
#         Cities_Metadata.Diversityoverallrank,
#         Cities_Metadata.TransitRank,
#         Cities_Metadata.PopulationRanking,
#         Cities_Metadata.locations,
#         Cities_Metadata.OverallRank,

#     ]

#     results = db.session.query(*sel).filter(Cities_Metadata.city == city).all()

#     # Create a dictionary entry for each row of metadata information
#     city_metadata = {}
#     for result in results:
#         city_metadata["city"] = result[0]
#         city_metadata["STATE"] = result[1]
#         city_metadata["CRITERIA1"] = result[2]
#         city_metadata["CRITERIA2"] = result[3]
#         city_metadata["CRITERIA3"] = result[4]
#         city_metadata["CRITERIA4"] = result[5]
#         city_metadata["CRITERIA5"] = result[6]
#         city_metadata["CRITERIA6"] = result[7]
#         city_metadata["CRITERIA7"] = result[8]
#         city_metadata["CRITERIA8"] = result[9]
#         city_metadata["CRITERIA9"] = result[10]

#     print(city_metadata)
#     return jsonify(city_metadata)


# @app.route("/cities/<city>")
# def cities(city):
#     """Return `otu_ids`, `otu_labels`,and `sample_values`."""
#     stmt = db.session.query(Cities).statement
#     df = pd.read_sql_query(stmt, db.session.bind)

#     # Filter the data based on the selected city and
#     # only keep rows with values above 1
#     city_data = df.loc[df[city] > 1, ["otu_id", "otu_label", sample]]
#     # Format the data to send as json
#     data = {
#         "otu_ids": sample_data.otu_id.values.tolist(),
#         "sample_values": sample_data[sample].values.tolist(),
#         "otu_labels": sample_data.otu_label.tolist(),
#     }
#     return jsonify(data)


if __name__ == "__main__":
    app.run()
