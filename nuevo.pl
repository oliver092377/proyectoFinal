#!/usr/bin/perl
use strict;
use warnings;
use CGI;
use DBI;

my $q = CGI->new;
print $q->header('text/xml');

my $usuario = $q->param("owner");
my $titulo = $q->param("title");
my $texto = $q->param("text");

if(defined($usuario) and defined($titulo) and defined($texto)){
  if(checkLogin($usuario)){
    registrar();
    mostrar();
  }else{
    showLogin();
  }
}else{
  showLogin();
}
sub checkLogin{
  my $userQuery = $_[0];

  my $user = 'alumno';
  my $password = 'pweb1';
  my $dsn = 'DBI:MariaDB:database=pweb1;host=localhost';
  my $dbh = DBI->connect($dsn, $user, $password) or die("No se pudo conectar!");

  my $sql = "SELECT userName FROM Users WHERE userName=? ";
  my $sth = $dbh->prepare($sql);
  $sth->execute($userQuery);
  my @row = $sth->fetchrow_array;
  $sth->finish;
  $dbh->disconnect;
  return @row;
}
sub registrar{
  my $user = 'alumno';
  my $password = 'pweb1';
  my $dsn = 'DBI:MariaDB:database=pweb1;host=localhost';
  my $dbh = DBI->connect($dsn, $user, $password) or die("No se pudo conectar!");
  my $sql = "INSERT INTO Articles VALUES ('$titulo','$usuario','$texto')";
  my $sth = $dbh->prepare($sql);
  $sth->execute();
  $sth->finish;
  $dbh->disconnect;
}
sub retornaEsto{
  my $quiero = $_[0];
  my $deTabla = $_[1];

  my $user = 'alumno';
  my $password = 'pweb1';
  my $dsn = 'DBI:MariaDB:database=pweb1;host=localhost';
  my $dbh = DBI->connect($dsn, $user, $password) or die("No se pudo conectar!");
  my $sql = "SELECT $quiero FROM $deTabla WHERE owner='$usuario' AND title='$titulo'";
  my $sth = $dbh->prepare($sql);
  $sth->execute();
  my @row = $sth->fetchrow_array;
  $sth->finish;
  $dbh->disconnect;
  return $row[0];
}
sub mostrar{
  print <<"HTML";
<?xml version="1.0" encoding="utf-8"?>
  <article>
    <title>$titulo</title>
    <text>$texto</text>
  </article>
HTML
}
sub showLogin{
  print <<"HTML";
<?xml version="1.0" encoding="utf-8"?>
    <article>
    </article>
HTML
}
