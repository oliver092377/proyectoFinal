#!/usr/bin/perl
use strict;
use warnings;
use CGI;
#prubw
#
my $q = CGI->new;
print $q->header('text/xml;charset=UTF-8');
my $titulo = $q->param("title");

print <<"HTML";
<?xml version="1.0" encoding="utf-8"?>
    <article>
      <owner>oliver</owner>
      <title>miTitulo</title>
      <text>#texto en h1</text>
    </article>
HTML
