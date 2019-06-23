import os

from Bio.Seq import Seq
from Bio import SeqIO

class ProteinMatch:
    def __init__(self, dnaSequence, proteinName, index):
        self.dnaSequence=dnaSequence
        self.proteinName = proteinName
        self.proteinPosition = index

    def __str__(self):
        return "%s found in %s at position %s" %(self.dnaSequence, self.proteinName, self.proteinPosition)

def getProteinFiles():
    return [f for f in os.listdir('.') if (os.path.isfile(f) and f.endswith(".fasta"))]

def findProtein(dnaSequence):
    dnaSeq=Seq(dnaSequence)
    for file in getProteinFiles():
        print "Looking for match in " + file
        proteinRecord=SeqIO.read(file, "fasta")
        index=proteinRecord.seq.find(dnaSeq)
        if index>0:
            return ProteinMatch(dnaSequence, proteinRecord.description, index)
    return None