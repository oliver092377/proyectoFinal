#!/usr/bin/perl
use strict;
use warnings;
use CGI;
#prubw
#
my $q = CGI->new;
print $q->header('text/xml;charset=UTF-8');
my $texto = $q->param("texto");
if()
print <<"HTML";
<?xml version="1.0" encoding="utf-8"?>
    <article>
      <owner>oliver</owner>
      <title>miTitulo</title>
      <text>#$texto</text>
    </article>
HTML
