
import os

import pandas as pd
import numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine

from flask import Flask, jsonify, render_template
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)


#################################################
# Database Setup
#################################################

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///db/karemDB.sqlite"
db = SQLAlchemy(app)

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(db.engine, reflect=True)

# Save references to each table
Samples = Base.classes.samples
Samples_Metadata=Base.classes.data1



@app.route("/")
def index():
    """Return the homepage."""
    return render_template("index.html")


@app.route("/names")
def names():
    """Return a list of sample names."""

    # Use Pandas to perform the sql query
    stmt = db.session.query(Samples).statement
    df = pd.read_sql_query(stmt, db.session.bind)
    print(df)

    # Return a list of the column names (sample names)
    return jsonify(list(df.columns)[1:])


@app.route("/metadata/<City>")
def sample_metadata(City):
    """Return the MetaData for a given sample."""
    sel = [
        Samples_Metadata.City,
        Samples_Metadata.BFRankOverall,
        Samples_Metadata.EducationalOverallRank,
        Samples_Metadata.MobileOverallrank,
        Samples_Metadata.Diversityoverallrank,
        Samples_Metadata.TransitRank,
        Samples_Metadata.PopulationRanking,
        Samples_Metadata.OverallRank,

    ]

    results = db.session.query(*sel).filter(Samples_Metadata.City == City).all()
    print (results)
    # Create a dictionary entry for each row of metadata information
    sample_metadata = {}
    for result in results:
        sample_metadata["City"] = result[0]
        sample_metadata["BFRankOverall"] = result[1]
        sample_metadata["EducationalOverallRank"] = result[2]
        sample_metadata["MobileOverallrank"] = result[3]
        sample_metadata["Diversityoverallrank"] = result[4]
        sample_metadata["TransitRank"] = result[5]
        sample_metadata["PopulationRanking"] = result[6]
        sample_metadata["OverallRank"] = result[7]

    print(sample_metadata)
    return jsonify(sample_metadata)


@app.route("/samples/<sample>")
def samples(sample):
    """Return `otu_ids`, `otu_labels`,and `sample_values`."""
    stmt = db.session.query(Samples).statement
    df = pd.read_sql_query(stmt, db.session.bind)

    # Filter the data based on the sample number and
    # only keep rows with values above 1
    sample_data = df.loc[df[sample] > 1, ["otu_id", "otu_label", sample]]
    # Format the data to send as json
    data = {
        "otu_ids": sample_data.otu_id.values.tolist(),
        "sample_values": sample_data[sample].values.tolist(),
        "otu_labels": sample_data.otu_label.tolist(),
    }
    return jsonify(data)


if __name__ == "__main__":
    app.run()
