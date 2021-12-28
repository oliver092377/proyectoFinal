#!/usr/bin/perl
use strict;
use warnings;
use CGI;
use DBI;


my $q = CGI->new;
print $q->header('text/xml;charset=UTF-8');

my $titulo = $q->param("title");
my $texto = $q->param("text");
my $usuario = $q->param("owner");

if(defined($usuario) and defined($titulo) and defined($texto)){
  if(checkLogin($usuario, $titulo)){
    modificar();
    mostrar();
  }else{
    showLogin('Usuario o contraseña equivocados, vuela a intentarlo');
  }
}else{
  showLogin();
}
sub checkLogin{
  my $userQuery = $_[0];
  my $miTitulo = $_[1];

  my $user = 'alumno';
  my $password = 'pweb1';
  my $dsn = 'DBI:MariaDB:database=pweb1;host=localhost';
  my $dbh = DBI->connect($dsn, $user, $password) or die("No se pudo conectar!");

  my $sql = "SELECT * FROM Articles WHERE owner=? AND title=?";
  my $sth = $dbh->prepare($sql);
  $sth->execute($userQuery, $miTitulo);
  my @row = $sth->fetchrow_array;
  $sth->finish;
  $dbh->disconnect;
  return @row;
}
sub modificar{
  my $user = 'alumno';
  my $password = 'pweb1';
  my $dsn = 'DBI:MariaDB:database=pweb1;host=localhost';
  my $dbh = DBI->connect($dsn, $user, $password) or die("No se pudo conectar!");

  my $sql = "UPDATE Articles SET text=? WHERE owner='$usuario' AND title='$titulo'";
  my $sth = $dbh->prepare($sql);
  $sth->execute($texto);
  $sth->finish;
  $dbh->disconnect;
}
sub mostrar{
  my $first=$_[0];
  my $last=$_[1];
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
