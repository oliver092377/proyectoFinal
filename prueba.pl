#!/usr/bin/perl
use strict;
use warnings;

  print <<"HTML";
<?xml version="1.0" encoding="utf-8"?>
    <article>
      <owner>$usuario</owner>
      <title>$titulo</title>
      <text>$miText</text>
    </article>
HTML
